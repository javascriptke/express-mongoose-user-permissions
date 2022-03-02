import { connect } from "mongoose";

export default ({ DB_URL }: { DB_URL: string }) => {
  connect(DB_URL)
    .then(() => {
      console.log("Db connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
