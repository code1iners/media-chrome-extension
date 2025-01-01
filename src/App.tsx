import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { serverHealthCheck } from "./actions/health-check";
import {
  mediaDownload,
  type MediaDownloadInput,
  mediaDownloadInputSchema,
} from "./actions/media-download";
import { SERVER_OPTIONS } from "./constants";

function App() {
  /** Server status */
  const [serverStatusValid, setServerStatusValid] = useState(false);

  /** Form inputs */
  const { register, handleSubmit, getValues } = useForm<MediaDownloadInput>({
    resolver: zodResolver(mediaDownloadInputSchema),
    defaultValues: {
      server: SERVER_OPTIONS.LOCAL,
    },
  });

  /** Health check API mutation */
  const {
    mutate: serverHealthCheckMutate,
    isPending: serverHealthCheckIsPending,
  } = useMutation({
    mutationFn: serverHealthCheck,
    onSuccess: (status) => {
      setServerStatusValid(status);
    },
    onError: () => {
      setServerStatusValid(false);
    },
  });

  /** Media download API mutation */
  const { mutate: mediaDownloadMutate, isPending: mediaDownloadIsPending } =
    useMutation({
      mutationFn: mediaDownload,
      onError: () => {
        alert("Failed");
      },
    });

  /** Form submit event handler. */
  const onSubmitValid = async ({ server, videoId }: MediaDownloadInput) => {
    mediaDownloadMutate({ server, videoId });
  };

  /** Server health check event handler. */
  const onServerHealthCheck = async () => {
    const serverOption = getValues("server");

    serverHealthCheckMutate({ serverOption });
  };

  return (
    <article className="p-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmitValid)}
      >
        {/* Server setting */}
        <div className="flex items-center gap-2 cursor-default">
          <small>서버 설정</small>

          <label className="space-x-2" htmlFor="input-radio-local">
            <span>로컬</span>
            <input
              id="input-radio-local"
              type="radio"
              value={SERVER_OPTIONS.LOCAL}
              {...register("server")}
            />
          </label>
          <label className="space-x-2" htmlFor="input-radio-remote">
            <span>원격</span>
            <input
              id="input-radio-remote"
              type="radio"
              value={SERVER_OPTIONS.REMOTE}
              {...register("server")}
            />
          </label>
        </div>

        {/* Video ID */}
        <label
          className="flex items-center gap-2 w-full"
          htmlFor="input-video-id"
        >
          <small className="whitespace-nowrap">Video ID</small>

          <input
            id="input-video-id"
            className="border w-fit min-w-0"
            type="text"
            autoComplete="off"
            autoFocus
            {...register("videoId")}
          />
        </label>

        <div className="flex items-center gap-2 justify-between">
          <button
            className="border grow disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            disabled={mediaDownloadIsPending || serverHealthCheckIsPending}
            onClick={onServerHealthCheck}
          >
            서버 체크
          </button>

          <button
            className="border grow disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!serverStatusValid || mediaDownloadIsPending}
          >
            {mediaDownloadIsPending ? "내려받는 중" : "다운로드"}
          </button>
        </div>
      </form>
    </article>
  );
}

export default App;
