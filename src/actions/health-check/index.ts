import { z } from "zod";
import { SERVER_URLS } from "../../constants";
import { mediaDownloadInputSchema } from "../media-download";

export const serverHealthCheckInputSchema = z.object({
  serverOption: mediaDownloadInputSchema.shape.server,
});

export type ServerHealthCheckInput = z.infer<
  typeof serverHealthCheckInputSchema
>;

export const serverHealthCheckOutputSchema = z.object({
  ok: z.boolean(),
});

export type ServerHealthCheckOutput = z.infer<
  typeof serverHealthCheckOutputSchema
>;

// Actions.
export async function serverHealthCheck(input: ServerHealthCheckInput) {
  const { serverOption } = input;

  const serverUrl = SERVER_URLS[serverOption];
  const fullUrl = `${serverUrl}`;

  const data: ServerHealthCheckOutput = await fetch(`${fullUrl}/health`).then(
    (response) => response.json(),
  );

  return data.ok;
}
