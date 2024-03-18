import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "first_lesson": {
      "value": "",
      "schema": {
         "label": "URL da primeira aula",
         "tooltip": "Pré-visualizando o conteúdo, você pode pegar a URL da primeira aula",
         "placeholder": "https://dashboard.kiwify.com.br/course/02fc2ecb-e6b9-48b7-9fbd-f4447673ab17?lesson=e11021a5-8a96-4703-9532-3845edd60ed0",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "first_lesson": "https://dashboard.kiwify.com.br/course/02fc2ecb-e6b9-48b7-9fbd-f4447673ab17?lesson=e11021a5-8a96-4703-9532-3845edd60ed0"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@first_lesson@"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "get_lesson_duration"
         }
      ],
      "get_lesson_duration": [
         {
            "command": "scrape_attr",
            "enabled": true,
            "target": "//*/header//h4",
            "attr": "innerText",
            "response_slot": "module_title"
         },
         {
            "command": "scrape_attr",
            "enabled": true,
            "target": "//*/header//h3",
            "attr": "innerText",
            "response_slot": "lesson_title"
         },
         {
            "command": "check_element",
            "enabled": true,
            "target": "//*/div[@class=\"plyr__controls__item plyr__time--current plyr__time\"]",
            "success_flow": "scrape_duration",
            "error_flow": "check_next_lesson"
         }
      ],
      "next_lesson": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*/header/div[last()]/div[last()]/button[2][not(@disabled)]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "8000"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "get_lesson_duration"
         }
      ],
      "end": [
         {
            "command": "set_env",
            "enabled": true,
            "env_query": "done",
            "value": "true"
         }
      ],
      "scrape_duration": [
         {
            "command": "scrape_attr",
            "enabled": true,
            "target": "//*/div[@class=\"plyr__controls__item plyr__time--current plyr__time\"]",
            "attr": "innerText",
            "response_slot": "@@$$res:module_title@ >> @@$$res:lesson_title@"
         },
         {
            "command": "check_element",
            "enabled": true,
            "target": "//*/header/div[last()]/div[last()]/button[2][not(@disabled)]",
            "success_flow": "next_lesson",
            "error_flow": "end"
         }
      ],
      "check_next_lesson": [
         {
            "command": "check_element",
            "enabled": true,
            "target": "//*/header/div[last()]/div[last()]/button[2][not(@disabled)]",
            "success_flow": "next_lesson",
            "error_flow": "end"
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

export const KiwifyGetDurationsBlock = {
    title: 'Kiwify - Extrair durações',
    block_id: '45630a80-3fc9-40a4-af4b-9a127a499cd3',
    description: 'Extrai as durações dos vídeos na visualização das aulas. Requer login.',
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    tags: ['kiwify'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}