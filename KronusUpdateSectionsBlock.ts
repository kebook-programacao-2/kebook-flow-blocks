import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "id": {
      "value": "",
      "schema": {
         "label": "Product ID",
         "tooltip": "Id tooltip",
         "placeholder": "Id placeholder",
         "type": "text"
      }
   },
   "sections": {
      "template_schema": {
         "section_name": "",
         "section_label": "",
         "orders": ""
      },
      "schema": {
         "label": "Sections",
         "tooltip": "Sections tooltip",
         "fields_type": "array",
         "fields": {
            "section_name": {
               "schema": {
                  "label": "Section name",
                  "tooltip": "Section_name tooltip",
                  "placeholder": "expertAffiliatedSection",
                  "type": "text"
               }
            },
            "section_label": {
               "schema": {
                  "label": "Section label",
                  "tooltip": "Section_label tooltip",
                  "placeholder": "Expert Affiliated Section",
                  "type": "text"
               }
            },
            "orders": {
               "template_schema": {
                  "order": ""
               },
               "schema": {
                  "label": "Orders",
                  "tooltip": "Orders tooltip",
                  "fields_type": "array",
                  "fields": {
                     "order": {
                        "schema": {
                           "label": "Order",
                           "tooltip": "Order tooltip",
                           "placeholder": "18",
                           "type": "text"
                        }
                     }
                  }
               }
            }
         }
      },
      "value": []
   }
};

const PAYLOAD: Payload = {
   "env": {
      "id": "2530",
      "_current_section_name": "",
      "_current_section_label": "",
      "sections": [
         {
            "section_name": "expertContentSection",
            "section_label": "Expert Content Section",
            "orders": [
               {
                  "order": ""
               }
            ]
         },
         {
            "section_name": "expertAffiliatedSection",
            "section_label": "Expert Affiliated Section",
            "orders": [
               {
                  "order": ""
               }
            ]
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "setup"
         }
      ],
      "setup": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/content/products/@@id@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/span[@class=\"title\" and text()=\"Seções\"]"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "update_sections",
            "env_var": "@@sections@"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "save_product"
         }
      ],
      "update_sections": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ _current_section_name: '@@section_name@', _current_section_label: '@@section_label@' })"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "get_section_order",
            "env_var": "@@orders@"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "remove_old_sections",
            "env_var": "@@orders@"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "create_sections"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "reorder_sections",
            "env_var": "@@orders@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         }
      ],
      "get_section_order": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//span[@class=\"collection\" and text()=\"@@$$env:_current_section_label@:\"])[@@_index@ + 1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "6000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ \"@scoped:order\": x(`//input[@collection=\"products_sections\" and @field=\"order\"]`).value })"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//article[@class=\"v-drawer\"]/div[contains(@class, \"v-button\")]/button"
         }
      ],
      "create_sections": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*[@id=\"sidebar\"]/div/div[1]/div[5]/div/div/div[1]/div[8]/div/button"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "1500"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "(//input[@data-v-f5e6fd87])[2]",
            "value": "@@section_name@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//li/div[@class=\"v-list-item-content\" and text()=\"@@$$env:_current_section_name@\"])[1]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button/*[text()=\"Executar fluxo no Item atual\"]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(20, 1000, (res) => { let el = x('//div[@class=\"fields\"]/div[last()]//button[not(contains(@class, \"loading\"))]'); el && res(el); });"
         }
      ],
      "remove_old_sections": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//span[@class=\"collection\" and text()=\"@@$$env:_current_section_label@:\"])[@@_index@ + 1]/following-sibling::span[@class=\"v-icon clear-icon\"]"
         }
      ],
      "reorder_sections": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//span[@class=\"collection\" and text()=\"@@$$env:_current_section_label@:\"])[@@_index@ + (@@_length@ + 1)]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value(`//input[@collection=\"products_sections\" and @field=\"order\"]`, \"@@order@\")"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//i[@data-icon=\"check\"])[2]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         }
      ],
      "save_product": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//i[@data-icon=\"check\"])[1]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/content/products/@@id@"
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

export const KronusUpdateSectionsBlock: BlockProps = {
    title: 'Kronus - Update Sections',
    block_id: '191460ef-d257-4206-a695-77f4f15bd459',
    description: 'Updates Kronus sections from a product.',
    dependencies: ['24b45134-d2be-48d1-a097-ab04224eebd9'],
    tags: ["kronus","dev"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}