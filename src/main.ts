import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt_auth.guard";

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.port || 3001;

  await app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}
start();
