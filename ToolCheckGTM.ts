import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "websites": {
      "template_schema": {
         "url": ""
      },
      "schema": {
         "label": "Websites",
         "tooltip": "All websites to check for the GTM tag",
         "fields_type": "array",
         "fields": {
            "url": {
               "schema": {
                  "label": "Url",
                  "tooltip": "The website url",
                  "placeholder": "https://website.com",
                  "type": "text"
               }
            }
         }
      },
      "value": []
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_$fb": {
         "pages": {
            "main_page": "main_page"
         }
      },
      "websites": [
         {
            "url": "https://ezequiasrelojoeiro.kebook.com.br/cursos/curso-de-relojoeiro-completo"
         },
         {
            "url": "https://badeco.kebook.com.br/cursos/moldes-de-silicone-passo-a-passo"
         },
         {
            "url": "https://aprenderarabe.com.br/"
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "check_gtm",
            "env_var": "@@websites@"
         }
      ],
      "check_gtm": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@url@"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(6, 1000, (res) => { const GTM_TAG = x(`//noscript//iframe[contains(@src, \"id=GTM-\")]|//noscript[contains(text(), 'GTM')]`)?.outerHTML?.match(/GTM-[\\w\\d]*(?=\")/g)?.[0]; res({ \"@@url@\": GTM_TAG || false }); });"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
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

export const ToolCheckGTMBlock: BlockProps = {
    title: 'Tool - Check GTM',
    block_id: 'f4195fd2-5238-49a9-9fd8-0bdbf74d64b7',
    description: 'Checks if the page has a GTM tag.',
    tags: ["tool","dev"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}