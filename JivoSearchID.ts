import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "jivo_email": {
      "value": "",
      "schema": {
         "label": "E-mail de login",
         "tooltip": "E-mail para login no Jivo",
         "placeholder": "usuario@email.com",
         "type": "text"
      }
   },
   "jivo_password": {
      "value": "",
      "schema": {
         "label": "Senha de login",
         "tooltip": "Senha para login no Jivo",
         "placeholder": "********",
         "type": "text"
      }
   },
   "jivo_url": {
      "value": "",
      "schema": {
         "label": "Nome do canal",
         "placeholder": "nomesobrenome.kebook.com.br",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "jivo_email": "kebook.programacao.2@gmail.com",
      "jivo_password": "Kbk@1234",
      "jivo_url": "https://bernardofernandes.kebook.com.br/cursos/sabao-caseiro-lucrativo",
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://app.jivosite.com/settings/channels?lang=pt"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='email']",
            "value": "%jivo_email%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='password']",
            "value": "%jivo_password%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[text()='Entrar']"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[contains(@placeholder,'Busque')]",
            "value": "%jivo_url%"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "select_brand_flow"
         }
      ],
      "select_brand_flow": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(text(), '%jivo_url%')]"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "instalation_flow"
         }
      ],
      "instalation_flow": [
        {
           "command": "click",
           "enabled": true,
           "target": "//*/div[text()='Instalação']"
        },
        {
           "command": "eval_expression",
           "enabled": true,
           "expression": "async_eval(5, 1000, (res) => res({ jivo_id: x('//textarea[@data-qa-id=\"widget-install-code-textarea\"]').value.match(/(?<=widget\\/).*(?=\")/g)[0] }))"
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

export const JivoSearchID = {
    title: 'Jivo - Search ID',
    block_id: '5647c62b-2201-41ea-93d9-39d64ec490be',
    description: 'Searches for an ID',
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}