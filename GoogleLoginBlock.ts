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
            "target": "https://accounts.google.com/ServiceLogin?hl=en-US&theme=mn&passive=true&continue=https://www.google.com/&ec=GAZAmgQ"
         },
         {
            "command": "eval_expression",
            "enabled": false,
            "expression": "env({ '@private:new_url': `${ window.location.href.replace('glif', 'mn') }&hl=en-US` })"
         },
         {
            "command": "goto",
            "enabled": false,
            "target": "@@new_url@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='email']",
            "value": "@@email@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div//*[text()='Next']"
         },
         {
            "command": "branch_eval",
            "enabled": true,
            // "expression": "async_eval(60, 1000, (res) => { const correctPasswordInput = x(`//input[@name=\"Passwd\"]`); correctPasswordInput && res(correctPasswordInput); })",
            "expression": "wait_for_element(90, `//input[@name=\"Passwd\"]`)",
            "success_flow": "captcha_pass",
            "error_flow": "auth_error"
         }
      ],
      "captcha_pass": [
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
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
      ],
      "auth_error": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ auth_error: 'Erro ao autenticar o login no Google.' })"
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