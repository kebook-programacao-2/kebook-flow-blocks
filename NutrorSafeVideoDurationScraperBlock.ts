import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "first_lesson_url": {
      "value": "",
      "schema": {
         "label": "Link da primeira aula",
         "tooltip": "A partir desta aula serão extraídas as aulas seguintes.",
         "placeholder": "https://app.nutror.com/curso/57e3449602960a3a4ba08190b2f4702d13d113d7/aula/6839451",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_$fb": {
         "pages": {
            "main_page": "main_page"
         }
      },
      "first_lesson_url": "https://app.nutror.com/curso/57e3449602960a3a4ba08190b2f4702d13d113d7/aula/6839446"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@first_lesson_url@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@id=\"btn-login\"]"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "@@first_lesson_url@"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "const formatTitle = (str) => str.toUpperCase().match(/[çáãâíóôõêéúû\\w\\d]+/gi).filter(v => v).join('_');"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "scrape_video_info"
         }
      ],
      "scrape_video_info": [
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@private:@expose:module_title': formatTitle(x(`//h4[@id=\"module-title\"]`).innerText) })"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@private:@expose:lesson_title': formatTitle(x(`//h1[@id=\"lesson-title\"]`).innerText) })"
         },
         {
            "command": "attach_to_iframe",
            "enabled": true,
            "xpath": "//iframe[@title=\"videoplayer\"]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@private:@expose:duration': x(`//div[@class=\"duration\"]`).innerText.match(/(?<=\\/ ).*/g)[0] });"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@expose:@query:@@module_title@.@@lesson_title@.duration': _$fb.duration })"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@expose:@query:@@module_title@.@@lesson_title@.secs_duration': _$fb.duration.split(':').reverse().map((v, i) => parseInt(v) * (Math.pow(60, i))).reduce((a,b) => a+b) })"
         },
         {
            "command": "detach_from_iframe",
            "enabled": true
         },
         {
            "command": "branch_eval",
            "enabled": true,
            "expression": "async_eval(6, 1000, (res) => { const nextBtn = x(`//button[@id=\"btn-next-lesson\" and not(@disabled)]`)?.id; res(nextBtn); })",
            "success_flow": "next_video",
            "error_flow": ""
         }
      ],
      "next_video": [
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@id=\"btn-next-lesson\"]"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "scrape_video_info"
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

export const NutrorSafeVideoDurationScraperBlock: BlockProps = {
    title: 'Nutror :: Safe Video - Extrair durações',
    block_id: 'fb19b21a-fe41-4157-980a-95c524b86ae8',
    description: 'Extrai durações dos vídeos da Safe Video.',
    dependencies: ['5817351e-5c56-4059-a620-759145d938a5'],
    tags: ["eduzz"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}