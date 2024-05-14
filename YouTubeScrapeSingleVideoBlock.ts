import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "playlist_url": {
      "value": "",
      "schema": {
         "label": "Video URL",
         "tooltip": "O link do vídeo para extrair as informações",
         "placeholder": "https://www.youtube.com/watch?v=_hqMALWpHD0",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_pages": {
         "main_page": "main_page"
      },
      "video_url": ""
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@video_url@"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ videos: [(() => {\n   const time = x(`//span[@class=\"ytp-time-duration\"]`).innerText; \n   const [sec, min, hour] = time.split(':').reverse(); \n   const time_in_seconds = ((parseInt(hour) || 0) * 3600) + ((parseInt(min) || 0) * 60) + parseInt(sec); \n   const title = x(`//div[@id=\"title\"]//span[@class=\"style-scope yt-formatted-string\"]`).innerText; \n   const link = window.location.href.match(/.*(?=&list=)/gi)[0]; \n   return { time, time_in_seconds, lesson_title: title, lesson_link: link } \n})()] })"
         }
      ]
   },
   "config": {
      "ws_endpoint": "",
      "close_browser_on_finish": false,
      "close_browser_on_cancel_request": false,
      "headless": false
   }
};

export const YouTubeScrapeSingleVideoBlock: BlockProps = {
    title: 'YouTube - Extrair vídeo',
    block_id: '376ff872-d7e3-4d2a-a656-d95c5d1a3ee5',
    description: 'Extrai título, tempo (formatado e em segundos) e link de um único vídeo.',
    tags: ["youtube"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}