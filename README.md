# Front

Front项目在QuickQui项目群中负责前端展现。总体设计主要看QuickQui项目的文档 - https://github.com/quickqui/main


## CRUD
根据模型自动生成基本的CRUD。

### CRUD 时属性的处理办法

|               | Scalar        | Object                                    | List - Scalar                              | List - Object                          | Relation - Object                                            | Relation - List - Object                                     |
| ------------- | ------------- | ----------------------------------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| （备注）      |               | 可能不需要，一般会做成relation - object？ |                                            | 跟relation的区别是不请求完整的数据。   |                                                              |                                                              |
| List          | formated Text |                                           | count                                      | count                                  | link to show， text=brief                                    | count                                                        |
| Show          | 适当的field   |                                           | list of text/其他适当的field               | list of text，json like string for now | link to show text=brief                                      | detail table                                                 |
| Edit & Create | 适当的input   |                                           | array input of text/其他适当的input - TODO | TODO                                   | 选择 - referenceInput+ 选择 - brief<br />后续，现场生成，不要破坏现场 | 多重选择 - referenceArrayInput + 选择 - brief<br />后续，现场生成，不要破坏现场 |

## 认证与授权
