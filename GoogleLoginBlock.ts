import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "email": {
      "value": "",
      "schema": {
         "label": "Email",
         "placeholder": "dev.da.silva@email.com",
         "type": "text"
      }
   },
   "password": {
      "value": "",
      "schema": {
         "label": "Senha",
         "placeholder": "*********",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "email": "kebook.programacao.2@gmail.com",
      "password": "4mYR51pz!"
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "login"
         }
      ],
      "login": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://analytics.google.com/analytics/web"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ new_url: `${ window.location.href.replace('glif', 'mn') }&hl=en-US` })"
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "@@new_url@"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='email']",
            "value": "@@email@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div//*[text()='Next']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='password']",
            "value": "@@password@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div//*[text()='Next']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "5000"
         },
         {
            "command": "branch_eval",
            "enabled": true,
            "expression": "async_eval(6, 1000, res => {const verifyBtn = x('//*[contains(text(), \"Use another phone or\")]');if (!verifyBtn) {res('Verificação OK!');} else {verifyBtn.click();return { error: 'Verifique sua conta do Google no link https://g.co/verifyaccount e depois execute o bloco novamente.' }}})",
            "success_flow": "",
            "error_flow": "auth_needed"
         }
      ],
      "auth_needed": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ erro: 'Verifique sua conta do Google no link https://g.co/verifyaccount e em seguida execute o bloco novamente.' })"
         },
         {
            "command": "close_browser",
            "enabled": true
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

export const GoogleLoginBlock = {
    title: 'Google - Login',
    block_id: 'a909454b-187e-4296-95ec-1effbe42d7af',
    description: 'Faz login no Google. Pode ser necessário verificação.',
    tags: ["google"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}