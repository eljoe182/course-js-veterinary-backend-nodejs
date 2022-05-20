import app from "./src/app.js";

function main() {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

main();
