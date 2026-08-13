import { initIndexes } from "../src/models/init-indexes";

initIndexes()
  .then(() => {
    console.log("Indexes created successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to create indexes:", err);
    process.exit(1);
  });
