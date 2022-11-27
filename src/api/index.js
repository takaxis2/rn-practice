const URL = "http://192.168.44.1";
// const URL = 'http://localhost:3300';

const getModels = async () => {
  return await fetch(`${URL}/model`, {
    method: "GET",
  });
};

export { URL, getModels };
