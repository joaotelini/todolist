import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Opções mínimas para produção
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;

export const connectDB = async () => {
  try {
    const client = await clientPromise;
    return client.db("todoList");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    throw error;
  }
};
