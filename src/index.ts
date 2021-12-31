import express from "express"
import cors from "cors";
import { weather } from "./routes/weatherRoute";
import dotenv from "dotenv";
import { dataExtractorsRouter } from "./routes/dataExtractorRoutes";
dotenv.config();

const app = express();

app.use(cors())

app.use("/weather", weather);
app.use(dataExtractorsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})