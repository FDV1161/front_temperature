export default function(instance) {
  return {
    getAll(payload) {
      return instance.get("journal_readings", { params: payload });
    },
    exportCSV(payload) {
      return instance.get(`journal_readings/export_csv`, { params: payload });
    },
  };
}
