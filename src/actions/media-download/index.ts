import { generate } from '@ce1pers/random-helpers';
import { z } from 'zod';
import { SERVER_OPTIONS, SERVER_URLS } from '../../constants';
import { querier } from '../../helpers';

// Schemas.

export const mediaDownloadInputSchema = z.object({
  videoId: z.string(),
  server: z.enum([SERVER_OPTIONS.LOCAL, SERVER_OPTIONS.REMOTE]),
  filename: z.string().optional(),
  resolution: z.number().optional(),
});

export type MediaDownloadInput = z.infer<typeof mediaDownloadInputSchema>;

// Actions.

export async function mediaDownload(input: MediaDownloadInput) {
  const { server, videoId, ...rest } = input;
  const serverUrl = SERVER_URLS[server];
  const query = querier(rest);
  const fullUrl = `${serverUrl}/video/${videoId}?${query.toString()}`;

  const response = await fetch(fullUrl);

  const cloned = response.clone();

  const contentDisposition = response.headers.get('Content-Disposition');
  console.log('headers', [...response.headers]);
  console.log('contentDisposition', contentDisposition);

  const blob = await cloned.blob();

  // blob을 브라우저에서 볼 수 있는 임시 url로 변환
  const url = URL.createObjectURL(blob);

  // a 태그 요소를 동적으로 생성
  const a = document.createElement('a');
  // a 태그의 href로 방금 만든 url을 지정
  a.href = url;
  // 다운받을 때 파일 이름 지정
  a.download = input.filename ?? generate({ length: 15 });
  // 문서에 a 태그를 추가(보통 안 붙여도 동작하긴 하지만, 호환성 생각해서 삽입)
  document.body.appendChild(a);
  // 클릭 이벤트를 강제로 발생시켜 다운로드 실행
  a.click();

  // 사용이 끝난 blob url 은 URL.revokeObjectURL 로 해제(리소스 낭비 방지)
  URL.revokeObjectURL(url);
  // a 태그도 문서에서 제거
  document.body.removeChild(a);
}
