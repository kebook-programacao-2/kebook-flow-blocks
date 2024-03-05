import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "gtag": {
      "value": "",
      "schema": {
         "label": "GTAG",
         "tooltip": "Tag do Google Analytics. Deixar em branco em caso de extração ou criação da Tag.",
         "placeholder": "G-123456",
         "type": "text"
      }
   },
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
      "gtag": "",
      "account_name": "nomesobrenome.kebook.com.br/curso/meu-curso-teste"
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "create_gtm"
         }
      ],
      "create_gtm": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://tagmanager.google.com/#/admin/accounts/create"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@id=\"1-form.account.properties.displayName\"]",
            "value": "%account_name%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@id=\"1-form.container.properties.displayName\"]",
            "value": "%account_name%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[@class=\"wd-context-name\" and text()='Web']"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@text=\"Create\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//gtm-checkbox[@data-ng-model=\"ctrl.accountForm.account.acceptDpa\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"resolve()\"]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(6, 1000, (res) => res({ gtm_tag: x(\"(//textarea[contains(@class, 'gtm-snippet__textarea')])[2]\")?.value?.match(/GTM-.*(?=\")/g)[0] || 'Tag not found' }))"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"save()\"]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[contains(@href, '/variables')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": false
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.openCreateSheet()\"]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value('//div[@name=\"variable.data.name\"]', 'auto', 'innerText')"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//gtm-empty-placeholder[@data-icon=\"gtm-variable-icon\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[text()='Permanente']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@data-ng-model=\"ctrl.value\"]",
            "value": "%gtag%"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "x('//button[@data-gtm-submit-button]').click()"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[contains(@href, '/tags')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": false
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.openCreateSheet()\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//div[@class=\"gtm-veditor-section-overlay wd-veditor-section-overlay\"])[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//td[contains(text(), ' Google Analytics ')]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[@ng-bind-html=\"::type.displayName\" and contains(text(), \"Tag do Google\")]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//div[contains(@class, \"gtm-text-addon\")]/input",
            "value": "{{auto}}"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//div[@class=\"gtm-veditor-section-overlay wd-veditor-section-overlay\"])[2]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[text()='All Pages']"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value('//div[@data-ng-model=\"ctrl.tag.data.name\"]', 'auto_tag', 'innerText')"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@type=\"submit\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.submit()\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), ' Publicar ')]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), 'Continuar')]"
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

export const GoogleAnalyticsCreateGTMTagBlock: BlockProps = {
    title: 'Google Analytics - Criar Tag GTM',
    block_id: '81658ed2-0ae8-41bc-b62e-4624ad6bf1d5',
    description: 'Cria uma tag do Google Tag Manager. Requer login.',
    dependencies: ['a909454b-187e-4296-95ec-1effbe42d7af'],
    tags: ["google"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}