import { Tensor, InferenceSession } from "onnxjs";
import model from "../resources/onnx_model.onnx";

export default async function (scaled_image) {
  const sess = new InferenceSession();
  await sess.loadModel(model);
  const input = new Tensor(new Float32Array(scaled_image.data), "float32");
  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;
  return predictions;
}
