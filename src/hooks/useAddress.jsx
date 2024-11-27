import data from "@assets/json/address.json";

function useAddress() {
  return {
    full: ({ province, district, ward, detail }) =>
      `${detail}, ${data[province]?.district[district]?.ward[ward]?.name}, ${data[province]?.district[district]?.name}, ${data[province]?.name}`,
    province: (provinceCode) => data[provinceCode]?.name,
  };
}

export default useAddress;
