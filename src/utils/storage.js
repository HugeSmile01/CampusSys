import { openDB } from 'idb';

const DB_NAME = 'campusSysDB';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('events')) {
        db.createObjectStore('events', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', { keyPath: 'id' });
      }
    },
  });
};

export const useIndexedDB = (storeName) => {
  const getAll = async () => {
    const db = await initDB();
    return db.getAll(storeName);
  };

  const add = async (item) => {
    const db = await initDB();
    return db.add(storeName, item);
  };

  const update = async (item) => {
    const db = await initDB();
    return db.put(storeName, item);
  };

  const remove = async (id) => {
    const db = await initDB();
    return db.delete(storeName, id);
  };

  return { getAll, add, update, remove };
};

export const useLocalStorage = () => {
  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};
