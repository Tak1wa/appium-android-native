const wdio = require("webdriverio");
const assert = require("assert");

// const opts = {
//   path: '/wd/hub',
//   port: 4723,
//   capabilities: {
//     platformName: "Android",
//     platformVersion: "11",
//     deviceName: "Android Emulator",
//     app: "/Users/iwasa.takahito/Downloads/app-debug.apk",
//     appPackage: "com.tak1wa.hellohello",
//     appActivity: ".MainActivity",
//     automationName: "UiAutomator2"
//   }
// };
const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {}
};

async function main () {
  const client = await wdio.remote(opts);
  const txt1 = await client.$(await client.findElement("id", "com.tak1wa.hellohello:id/txtParam1"));
  await txt1.setValue("2");

  const txt2 = await client.$(await client.findElement("id", "com.tak1wa.hellohello:id/txtParam2"));
  await txt2.setValue("3");

  const btn = await client.$(await client.findElement("id", "com.tak1wa.hellohello:id/btnInput"));
  await btn.click();

  const lbl = await client.$(await client.findElement("id", "com.tak1wa.hellohello:id/lblOutput"));
  const value = await lbl.getText();
  assert.strictEqual(value,"5");

  let screenshot = await client.takeScreenshot();

  await client.deleteSession();
}

main();