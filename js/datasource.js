var mainData = [
  {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
  {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"}
];

var masterData = [
  {"contract_id":"123","contract_name":"大富翁","number":"222","quantity":"1","price":"244","sale":"20"},
  {"contract_id":"124","contract_name":"蛋黃哥","number":"221","quantity":"2","price":"534","sale":"10"},
  {"contract_id":"111","contract_name":"玉山送大杯拿鐵","number":"224","quantity":"3","price":"12","sale":"10"},
  {"contract_id":"543","contract_name":"樂天送跑車","number":"225","quantity":"4","price":"8656","sale":"30"},
  {"contract_id":"32","contract_name":"天使帝國","number":"556","quantity":"5","price":"354","sale":"20"},
  {"contract_id":"776","contract_name":"樂天送房子","number":"667","quantity":"6","price":"674","sale":"0"},
  {"contract_id":"887","contract_name":"集點換大獎","number":"887","quantity":"7","price":"2354","sale":"20"},
  {"contract_id":"443","contract_name":"大天使之劍","number":"663","quantity":"8","price":"87","sale":"10"},
  {"contract_id":"334","contract_name":"鬥陣特攻","number":"889","quantity":"9","price":"34","sale":"10"},
  {"contract_id":"665","contract_name":"蜘蛛人電影","number":"995","quantity":"10","price":"134","sale":"10"},
  {"contract_id":"666","contract_name":"神鬼奇航","number":"332","quantity":"11","price":"758","sale":"15"}
]

var detailData = [
  {"group_id":"234","group_name":"台北","quantity":"43235","total":"244"},
  {"group_id":"6534","group_name":"台中","quantity":"23565","total":"534"},
  {"group_id":"444","group_name":"桃園","quantity":"6434","total":"12"},
  {"group_id":"9834","group_name":"基隆","quantity":"7564","total":"8656"},
  {"group_id":"524","group_name":"南投","quantity":"53346","total":"354"},
  {"group_id":"66","group_name":"台南","quantity":"12341","total":"674"},
  {"group_id":"9685","group_name":"高雄","quantity":"6434","total":"2354"},
  {"group_id":"907","group_name":"彰化","quantity":"8768","total":"87"},
  {"group_id":"9955","group_name":"屏東","quantity":"967","total":"34"},
  {"group_id":"325","group_name":"台東","quantity":"5375","total":"134"},
  {"group_id":"3126","group_name":"新竹","quantity":"465745","total":"758"},
  {"group_id":"4312","group_name":"雲林","quantity":"3676","total":"758"},
  {"group_id":"7753","group_name":"花蓮","quantity":"7764","total":"758"},
  {"group_id":"856","group_name":"宜蘭","quantity":"443","total":"758"}
]

var homeData = [
{"date":"2018/06/30","content":"各區窗口、北一及中區。王小明：北二及高屏。王大明：北三南區。"},
{"date":"2018/06/29","content":"高屏區測試公告"},
{"date":"2018/06/28","content":"悠遊卡資料未上傳"},
{"date":"2018/06/27","content":"編號EMOO49新品UNIDESIGN 纖細軟毛抗菌牙刷休配--發布日"},
{"date":"2018/06/26","content":"各區窗口、北一及中區。王小明：北二及高屏。王大明：北三南區。"},
{"date":"2018/06/25","content":"高屏區測試公告"},
{"date":"2018/06/24","content":"悠遊卡資料未上傳"},
{"date":"2018/06/23","content":"編號EMOO49新品UNIDESIGN 纖細軟毛抗菌牙刷休配--發布日"},
{"date":"2018/06/22","content":"各區窗口、北一及中區。王小明：北二及高屏。王大明：北三南區。"},
{"date":"2018/06/21","content":"高屏區測試公告"},
{"date":"2018/06/20","content":"悠遊卡資料未上傳"},
{"date":"2018/06/19","content":"編號EMOO49新品UNIDESIGN 纖細軟毛抗菌牙刷休配--發布日"},
{"date":"2018/06/18","content":"各區窗口、北一及中區。王小明：北二及高屏。王大明：北三南區。"},
{"date":"2018/06/17","content":"高屏區測試公告"},
{"date":"2018/06/16","content":"悠遊卡資料未上傳"},
{"date":"2018/06/15","content":"編號EMOO49新品UNIDESIGN 纖細軟毛抗菌牙刷休配--發布日"}
]
