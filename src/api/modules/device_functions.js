export default function(instance) {
  return {
    get(payload) {
      return instance.get("device_functions/" + payload);
    },
    create(payload) {
      return instance.post("device_functions/", payload);
    },
    delete(payload) {
      return instance.delete("device_functions/" + payload);
    },
    update(payload) {
      return instance.put("device_functions/" + payload.id, payload);
    },
    run(payload) {
      return instance.post("device_functions/run/", payload);
    },
  };
}
