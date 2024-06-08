import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost", {
  port: 1883,
  username: "e35a0e16-481f-4c7a-aafe-d9757c4767fa",
  password: "1304aee3-91c4-4960-b278-8ea2041cccca",
  clientId: "环境监测终端"
});
client.on("connect", pkt => {
  console.log("\nconnect: successfully\n");
  const data = JSON.stringify(generateData());

  client.publish("attributes/post", data, { retain: true });
});
/**
 * @description 生成数据
 */
const generateData = () => {

};
/**
 * @description 生成温度
 */
const generateTemperature = () => {

};
/**
 * @description 生成湿度
 */
const generateHumidity = () => {

};






