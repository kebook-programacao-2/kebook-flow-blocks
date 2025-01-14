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
   },
   "category": {
      "value": "",
      "schema": {
         "label": "Categoria",
         "tooltip": "Categoria onde o produto se encaixa",
         "placeholder": "Selecione uma categoria",
         "fields_type": "select",
         "options": [
            "Artes e entretenimento",
            "Automóveis e veículos",
            "Beleza e fitness",
            "Livros e literatura",
            "Comércio e indústria",
            "Computadores e eletrônicos",
            "Finanças",
            "Comidas e bebidas",
            "Jogos",
            "Saúde",
            "Casa e jardim",
            "Internet e telecomunicações",
            "Empregos e educação",
            "Lei e governo",
            "Notícias",
            "Comunidades on-line",
            "Pessoas e sociedade",
            "Animais de estimação e animais",
            "Serviços imobiliários",
            "Referência",
            "Ciência",
            "Compras",
            "Esportes",
            "Viagens",
            "Outras atividades comerciais"
         ]
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "account_name": "heitorschleder.kebook.com.br/curso/guia-pratico-de-como-utilizar-o-kronus/dev-test-001",  
      "category": "Artes e entretenimento"
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "navigate_admin"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "create_property"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "commercial_details"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "business_objectives"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "data_collection"
         }
      ],
      "create_property": [
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='name']",
            "value": "@@account_name@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[@debug-id=\"menu-open-button\"])[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"search-input\"]",
            "value": "Brasil"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@class, 'option-item-wrapper') and not(contains(@class, 'option-filtered'))]//button[@debug-id=\"option-item\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[@debug-id=\"menu-open-button\"])[2]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"search-input\"]",
            "value": "São Paulo"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@class, 'option-item-wrapper') and not(contains(@class, 'option-filtered'))]//button[@debug-id=\"option-item\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[@debug-id=\"menu-open-button\"])[3]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"search-input\"]",
            "value": "Real"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@class, 'option-item-wrapper') and not(contains(@class, 'option-filtered'))]//button[@debug-id=\"option-item\"]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//*[text()='Próxima'])[1]"
         }
      ],
      "navigate_admin": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://analytics.google.com/analytics/web?hl=pt-BR"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/a//span[text()='Administrador']"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@aria-haspopup=\"menu\"]//span[contains(text(), 'Criar')]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@role=\"menuitem\"]//*[text()='Propriedade']"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         }
      ],
      "commercial_details": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[@debug-id=\"menu-open-button\"])[4]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"search-input\"]",
            "value": "@@category@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@class, 'option-item-wrapper') and not(contains(@class, 'option-filtered'))]//button[@debug-id=\"option-item\"]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/input[@type='radio'])[1]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//*[text()='Próxima'])[2]"
         }
      ],
      "business_objectives": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/input[@type=\"checkbox\"])[1]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/input[@type=\"checkbox\"])[2]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/input[@type=\"checkbox\"])[3]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/input[@type=\"checkbox\"])[4]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button//span[text()='Criar']"
         }
      ],
      "data_collection": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@debug-id=\"create-web-stream-button\"]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"website-url-input\"]",
            "value": "@@account_name@"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"stream-name-input\"]",
            "value": "https://@@account_name@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@debug-id=\"create-stream-button\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "5000"
         },
         {
            "command": "attach_to_iframe",
            "enabled": true,
            "xpath": "//iframe[contains(@class, \"ogt-iframe\")]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(20, 1000, (res) => { const gtag = x(`//div[@class=\"ogt-snippet\"]`)?.innerText?.match(/G-[^\"']+/g)?.[0]; gtag && res({ gtag }); })"
         },
         {
            "command": "detach_from_iframe",
            "enabled": true
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

export const GoogleAnalyticsCreatePropertyBlock: BlockProps = {
    title: 'Google Analytics - Criar propriedade',
    block_id: 'ccf422e6-21dc-42e9-93d8-1b4354f48180',
    description: 'Cria uma propriedade do Google Analytics. Requer login.',
    dependencies: ['a909454b-187e-4296-95ec-1effbe42d7af'],
    tags: ["google"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}