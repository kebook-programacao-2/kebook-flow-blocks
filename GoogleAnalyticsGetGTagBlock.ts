import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "account_name": {
      "value": "",
      "schema": {
         "label": "Nome da conta do Google Analytics",
         "tooltip": "O nome da conta (geralmente a URL do produto sem o protocolo HTTPS)",
         "placeholder": "heitorschleder.kebook.com.br/curso/guia-pratico-de-como-utilizar-o-kronus",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "account_name": "heitorschleder.kebook.com.br/curso/guia-pratico-de-como-utilizar-o-kronus"
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "get_gtag"
         }
      ],
      "get_gtag": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://analytics.google.com/analytics"
         },
         {
            "command": "eval_expression",
            "enabled": false,
            "expression": "goto('https://analytics.google.com/analytics/web?hl=pt-BR')"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": false,
            "time": ""
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//span[@debug-id='selected-entity-text']"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@mdx-gtm-action=\"Search Universal Picker\"]",
            "value": "@@account_name@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//a[@mdx-gtm-action=\"Switch Entities\"])[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[@guidedhelpid=\"guided-help-admin-module\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "6000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[contains(text(), 'Fluxos de dados')]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "5000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//mat-row)[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ gtag: x('//div[@guidedhelpid=\"measurement-id\"]').innerText.split('\\n')[0] })"
         }
      ]
   },
   "config": {
      "ws_endpoint": "",
      "close_browser_on_finish": false,
      "close_browser_on_cancel_request": false,
      "headless": true
   }
};

export const GoogleAnalyticsGetGTagBlock: BlockProps = {
    title: 'Google Analytics - Extrair Tag',
    block_id: 'dc23bc42-d359-404e-91af-f23826864f1a',
    description: 'Extrai a Tag da conta do Google Analytics informada.',
    dependencies: ['a909454b-187e-4296-95ec-1effbe42d7af'],
    tags: ["google"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}