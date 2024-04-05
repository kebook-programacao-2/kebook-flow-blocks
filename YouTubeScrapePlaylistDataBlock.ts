import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "playlist_url": {
      "value": "",
      "schema": {
         "label": "URL da Playlist",
         "placeholder": "https://www.youtube.com/playlist?list=PL4G2ZPtawqeuUNVEPtiJg8jP3ADHUG4Vv",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_pages": {
         "main_page": "main_page"
      },
      "playlist_url": "https://www.youtube.com/playlist?list=PLT98CRl2KxKGj-VKtApD8-zCqSaN2mD4w"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@playlist_url@"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@expose:videos_count': parseInt(x(\"//*/div[contains(@class, 'metadata-stats')]//span[1]\").innerText) });"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "check_count"
         }
      ],
      "press_end": [
         {
            "command": "press_key",
            "enabled": true,
            "key": "End"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "_$fb.videos_count -= 100"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "check_count"
         }
      ],
      "check_count": [
         {
            "command": "branch_eval",
            "enabled": true,
            "expression": "_$fb.videos_count > 99",
            "success_flow": "press_end",
            "error_flow": "scrape"
         }
      ],
      "scrape": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "(() => ({    videos: xxx('//*/div[@id=\"content\"]//div[@id=\"content\"]').map((video, index) => {    const time = x(`(//*/div[@id=\"content\"]//div[@id=\"content\"])[${ index + 1 }]//div[@id=\"time-status\"]`).innerText.trim();    const [sec, min, hour] = time.split(':').reverse();    const time_in_seconds = ((parseInt(hour) || 0) * 3600) + ((parseInt(min) || 0) * 60) + parseInt(sec);     const title = x(`(//*/div[@id=\"content\"]//div[@id=\"content\"])[${ index + 1 }]//a[@id=\"video-title\"]`).title;    const link = x(`(//*/div[@id=\"content\"]//div[@id=\"content\"])[${ index + 1 }]//a[@id=\"video-title\"]`).href.match(/.*(?=&list=)/gi)[0];     return {       index: index + 1,       time,       time_in_seconds,       title,       link    } }) }))()"
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

export const YouTubeScrapePlaylistDataBlock = {
    title: 'YouTube - Extrair playlist',
    block_id: 'b4e8ed3b-6ada-4ca5-8957-884e424a3915',
    description: 'Extrai título, tempo (formatado e em segundos) e link de todos os vídeos de uma playlist.',
    tags: ['youtube'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}