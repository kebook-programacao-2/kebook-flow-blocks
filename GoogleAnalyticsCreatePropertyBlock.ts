import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "email": {
      "value": "",
      "schema": {
         "label": "E-mail",
         "tooltip": "E-mail para login no GA",
         "placeholder": "devdasilva@email.com",
         "type": "text"
      }
   },
   "password": {
      "value": "",
      "schema": {
         "label": "Senha",
         "tooltip": "Senha para login no GA",
         "placeholder": "*********",
         "type": "text"
      }
   },
   "prop_name": {
      "value": "",
      "schema": {
         "label": "Nome da propriedade",
         "tooltip": "O nome da propriedade para identificação dentro da plataforma (por padrão é a URL do produto)",
         "placeholder": "devdasilva.kebook.com.br/curso/guia-do-kronus",
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
      "email": "kebook.programacao.2@gmail.com",
      "password": "4mYR51pz!",
      "prop_name": "devdasilva.kebook.com.br/curso/guia-do-kronus",  
      "category": {
         "value": "Empregos e educação",
         "__options__": [
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
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "login"
         },
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
      "login": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://analytics.google.com/analytics/web"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='email']",
            "value": "%email%"
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
            "value": "%password%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div//*[text()='Next']"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         }
      ],
      "create_property": [
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='name']",
            "value": "%prop_name%"
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
            "value": "%category.value%"
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
            "value": "%prop_name%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@debug-id=\"stream-name-input\"]",
            "value": "https://%prop_name%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@debug-id=\"create-stream-button\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "10000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/i[@aria-label=\"Fechar tela\"]"
         },
         {
            "command": "scrape_attr",
            "enabled": true,
            "target": "//*/div[@guidedhelpid=\"measurement-id\"]/span",
            "attr": "innerText",
            "response_slot": "metrics_id"
         }
      ],
      "gtag-eval": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "console.log('GTAG', x('//*/div[@data-ng-if=\"ctrl.snippet\"]').innerText.match(/G-[A-z,0-9]*/gi))"
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

export const GoogleAnalyticsCreatePropertyBlock = {
    title: 'Google Analytics - Criar propriedade',
    block_id: 'ccf422e6-21dc-42e9-93d8-1b4354f48180',
    description: 'Cria uma propriedade do Google Analytics.',
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}