const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

const getDatabasePath = () => {
  const appName = app.getName();
  const platform = os.platform();
  if (platform === "win32") {
    return path.join(process.env.APPDATA, appName);
  } else if (platform === "darwin") {
    return path.join(process.env.HOME, "Library", "Application Support", appName);
  } else {
    return path.join("var", "local", appName);
  }
};

const filterDocuments = (documents, query) =>
  documents.filter((element) => Object.keys(query).every((key) => element[key] === query[key]));

const create = (collection) => {
  const tablePath = path.join(getDatabasePath(), collection + ".json");
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tablePath)) {
      console.log(`Found existing database table at ${tablePath}`);
      resolve(tablePath);
    } else {
      try {
        fs.writeFileSync(tablePath, JSON.stringify({ [collection]: [] }, null, 2), (error) => reject(error));
        console.log(`Create database table at ${tablePath}`);
        resolve(tablePath);
      } catch (error) {
        reject(error);
      }
    }
  });
};

const insert = (collection, document) => {
  const tablePath = path.join(getDatabasePath(), collection + ".json");
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tablePath)) {
      let data = JSON.parse(fs.readFileSync(tablePath));
      
      if (!("id" in document)) {
        let id = crypto.randomBytes(16).toString("hex");
        document["id"] = id;
      }
      data[collection].push(document);

      try {
        fs.writeFileSync(tablePath, JSON.stringify(data, null, 2), (error) => reject(error));

        resolve(document);
      } catch (error) {
        reject(`No ${collection} collection found.`);
      }
    } else {
    }
  });
};

const find = (collection, query) => {
  const tablePath = path.join(getDatabasePath(), collection + ".json");
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tablePath)) {
      const data = JSON.parse(fs.readFileSync(tablePath));
      const results = filterDocuments(data[collection], query);
      resolve(results);
    } else {
      reject(`No ${collection} collection found.`);
    }
  });
};

const update = (collection, query, set) => {
  const tablePath = path.join(getDatabasePath(), collection + ".json");
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tablePath)) {
      let data = JSON.parse(fs.readFileSync(tablePath));

      let updatedDocuments = [];
      data[collection] = data[collection].map((document) => {
        if (Object.keys(query).every((key) => document[key] === query[key])) {
          const updatedDocument = { ...document, ...set };
          updatedDocuments.push(updatedDocument);
          return updatedDocument;
        }
        return document;
      });

      try {
        fs.writeFileSync(tablePath, JSON.stringify(data, null, 2), (error) => reject(error));
        resolve(updatedDocuments);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(`No ${collection} collection found.`);
    }
  });
};

const remove = (collection, query, set) => {
  const tablePath = path.join(getDatabasePath(), collection + ".json");
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tablePath)) {
      let data = JSON.parse(fs.readFileSync(tablePath));

      const documentsToDelete = filterDocuments(data[collection], query);
      data[collection] = data[collection].filter((document) => !documentsToDelete.includes(document));

      try {
        fs.writeFileSync(tablePath, JSON.stringify(data, null, 2), (error) => reject(error));
        resolve(documentsToDelete);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(`No ${collection} collection found.`);
    }
  });
};

module.exports = {
  create,
  insert,
  find,
  update,
  remove,
};
