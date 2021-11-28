class DatabaseProvider {
  constructor() {
    this.db = {};
    this.request = null;
    this.dbName = "dsa-tracker";
    this.dbVersion = 1;
    this.stores = { questions: "questions" };
  }

  init = () => {
    return new Promise((resolve, reject) => {
      this.request = window.indexedDB.open(this.dbName, this.dbVersion);

      this.request.onerror = (err) => {
        console.log(err);
      };
      this.request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      this.request.onupgradeneeded = () => {
        this.db = this.request.result;
        this.createStores();
      };
    });
  };

  createStores() {
    const storeConfig = { keyPath: "id", autoIncrement: true };
    const objectStores = this.db.createObjectStore(
      this.stores.questions,
      storeConfig
    );
    objectStores.createIndex("topic", "topic");
  }

  getQuestionStore() {
    const transaction = this.db.transaction(
      [this.stores.questions],
      "readwrite"
    );
    transaction.onerror = (err) => {
      console.log(err);
    };
    return transaction.objectStore(this.stores.questions);
  }

  add = (question) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const addRequest = objectStore.put(question);
      addRequest.onsuccess = async () => {
        resolve("sucess");
      };
      addRequest.onerror = (err) => {
        reject(err);
      };
    });
  };

  addInBulk = (questions) => {
    const promises = [];
    for (let question of questions) {
      promises.push(this.add(question));
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(async () => {
          resolve("success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  updateById = (id, newValue) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const updateRequest = objectStore.put(newValue);
      updateRequest.onsuccess = async () => {
        const allQuestions = await this.getQuestionsByTopic(newValue.topic);
        resolve(allQuestions);
      };

      updateRequest.onerror = (err) => {
        console.log(err);
        reject(err);
      };
    });
  };

  getAllQuestions = () => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = async () => {
        resolve(getAllRequest.result);
      };
      getAllRequest.onerror = (err) => {
        reject(err);
      };
    });
  };

  getQuestion = (key) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const getRequest = objectStore.get(key);
      getRequest.onsuccess = async () => {
        resolve(getRequest.result);
      };
      getRequest.onerror = (err) => {
        reject(err);
      };
    });
  };

  getQuestionsByTopic = (topic) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const index = objectStore.index("topic").getAll(topic);

      index.onsuccess = () => {
        resolve(index.result);
      };

      index.onerror = (err) => {
        reject(err);
      };
    });
  };

  getCountForAll() {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const countRequest = objectStore.count();
      countRequest.onsuccess = () => {
        resolve(countRequest.result);
      };
      countRequest.onerror = (err) => {
        reject(err);
      };
    });
  }

  getCountByTopic = (topic) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const index = objectStore.index("topic").count(topic);

      index.onsuccess = () => {
        resolve(index.result);
      };

      index.onerror = (err) => {
        reject(err);
      };
    });
  };

  getAllTopics() {
    return new Promise((resolve, reject) => {
      const objectStore = this.getQuestionStore();
      const keysRequest = objectStore.index("topic").openKeyCursor();
      const items = new Set();
      keysRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (!items.has(cursor.key)) {
            items.add(cursor.key);
          }
          cursor.continue();
        } else {
          resolve(Array.from(items.values()));
        }
      };
      keysRequest.onerror = (err) => {
        reject(err);
      };
    });
  }
}

export const DataBaseService = new DatabaseProvider();
