import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "first_lesson": {
      "value": "",
      "schema": {
         "label": "First_lesson",
         "tooltip": "First_lesson tooltip",
         "placeholder": "First_lesson placeholder",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "first_lesson": "https://dashboard.kiwify.com.br/course/464b7afa-5531-4238-bc1f-0511dafcca4e?lesson=30864e78-ce38-49b4-a276-d3f4a765db53"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@first_lesson@"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "get_lesson_duration"
         }
      ],
      "get_lesson_duration": [
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
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "get_lesson_duration"
         }
      ],
      "end": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ done: true })"
         }
      ],
      "scrape_duration": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ 'module_title': x(`//header//h4`).innerText, 'lesson_title': x(`//header//h3`).innerText })"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-plyr=\"play\"]"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "eval_expression",
            "enabled": false,
            "expression": "env({ '@query:@@module_title@.@@lesson_title@': x(`//input[@type=\"range\" and @data-plyr=\"seek\"]`).getAttribute('aria-valuetext').split('of')[1].trim() })"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@query:@@module_title@.@@lesson_title@': (() => {\n   const time = x(`//input[@type=\"range\" and @data-plyr=\"seek\"]`).getAttribute('aria-valuetext').split('of')[1].trim();\n   const [sec, min, hour] = time.split(':').reverse();\n   const time_in_seconds = ((parseInt(hour) || 0) * 3600) + ((parseInt(min) || 0) * 60) + parseInt(sec);\n   return time_in_seconds;\n})() })"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "check_next_lesson"
         }
      ],
      "check_next_lesson": [
         {
            "command": "branch_eval",
            "enabled": true,
            "expression": "async_eval(5, 1000, (res) => { const nextLessonBtn = x(`//header/div[last()]/div[last()]/button[2][not(@disabled)]`); nextLessonBtn && res(true); })",
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

export const KiwifyGetIntegratedVideosDurationsBlock: BlockProps = {
    title: 'Kiwify (Integrado) - Extrair Durações',
    block_id: 'a0d5c51f-605b-4b27-8532-bea630d1146d',
    description: 'Extrai as durações dos vídeos hospedados (de forma integrada) na Kiwify.',
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    tags: ["kiwify"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}