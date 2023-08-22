import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/authAxios";
import { useTranslation } from "react-i18next";

const SkillsetPanel = ({ companyInfo }) => {
  const { userState } = useContext(AuthContext);
  const { t } = useTranslation("companyEditModal");

  const [initialType, setInitialType] = useState(
    companyInfo?.current?.company.company_info[0]?.type?.[userState.user.userLanguage] || ""
  );
  const [initialCEO, setInitialCEO] = useState(
    companyInfo?.current?.company.company_info[0]?.ceo?.[userState.user.userLanguage] || ""
  );
  const [initialFunding, setInitialFunding] = useState(companyInfo?.current?.company.company_info[0]?.funding || "");
  const [initialEmployees, setInitialEmployees] = useState(
    companyInfo?.current?.company.company_info[0]?.employees || ""
  );
  const [initialFoundingDate, setInitialFoundingDate] = useState(
    companyInfo?.current?.company.company_info[0]?.foundingDate || new Date()
  );
  const [initialRevenue, setInitialRevenue] = useState(companyInfo?.current?.company.company_info[0]?.revenue || "");
  const [initialService, setInitialService] = useState(
    companyInfo?.current?.company.company_info[0]?.service?.[userState.user.userLanguage] || ""
  );
  const [initialAddress, setInitialAddress] = useState(
    companyInfo?.current?.company.company_info[0]?.address?.[userState.user.userLanguage] || ""
  );
  const [type, setType] = useState(initialType);
  const [ceo, setCeo] = useState(initialCEO);
  const [funding, setFunding] = useState(initialFunding);
  const [employees, setEmployees] = useState(initialEmployees);
  const [foundingDate, setFoundingDate] = useState(initialFoundingDate);
  const [revenue, setRevenue] = useState(initialRevenue);
  const [service, setService] = useState(initialService);
  const [address, setAddress] = useState(initialAddress);

  const [isReady, setReady] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const saveDetails = () => {
    setLoading(true);
    axios
      .post(
        `/v1/company/update`,
        {
          company: {
            company_info: [
              {
                ...(initialType !== type && { type: { [userState.user.userLanguage]: type } }),
                ...(initialCEO !== ceo && { ceo: { [userState.user.userLanguage]: ceo } }),
                ...(initialFunding !== funding && { funding: funding }),
                ...(initialEmployees !== employees && { employees: employees }),
                ...(initialFoundingDate !== foundingDate && { foundingDate: foundingDate }),
                ...(initialRevenue !== revenue && { revenue: revenue }),
                ...(initialService !== service && { service: { [userState.user.userLanguage]: service } }),
                ...(initialAddress !== address && { address: { [userState.user.userLanguage]: address } }),
              },
            ],
          },
        },
        { params: { company_id: companyInfo.current?.company?.company_id } }
      )
      .then((response) => {
        companyInfo.current = {
          ...companyInfo.current,
          ...{
            company: {
              ...companyInfo.current.company,
              company_info: [
                {
                  ...companyInfo.current.company.company_info[0],
                  ...(initialType !== type && { type: { [userState.user.userLanguage]: type } }),
                  ...(initialCEO !== ceo && { ceo: { [userState.user.userLanguage]: ceo } }),
                  ...(initialFunding !== funding && { funding: funding }),
                  ...(initialEmployees !== employees && { employees: employees }),
                  ...(initialFoundingDate !== foundingDate && { foundingDate: foundingDate }),
                  ...(initialRevenue !== revenue && { revenue: revenue }),
                  ...(initialService !== service && { service: { [userState.user.userLanguage]: service } }),
                  ...(initialAddress !== address && { address: { [userState.user.userLanguage]: address } }),
                },
              ],
            },
          },
        };
        setInitialType(type);
        setInitialCEO(ceo);
        setInitialFunding(funding);
        setInitialEmployees(employees);
        setInitialFoundingDate(foundingDate);
        setInitialRevenue(revenue);
        setInitialService(service);
        setInitialAddress(address);
        setSaved(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (
      initialType !== type ||
      initialCEO !== ceo ||
      initialFunding !== funding ||
      initialEmployees !== employees ||
      initialFoundingDate !== foundingDate ||
      initialRevenue !== revenue ||
      initialService !== service ||
      initialAddress !== address
    ) {
      setSaved(false);
      setLoading(false);
      setReady(true);
    } else {
      setReady(false);
    }
    return () => {
      setReady(false);
      setLoading(false);
    };
  }, [
    type,
    ceo,
    funding,
    employees,
    foundingDate,
    revenue,
    service,
    address,
    initialType,
    initialCEO,
    initialFunding,
    initialEmployees,
    initialFoundingDate,
    initialRevenue,
    initialService,
    initialAddress,
  ]);

  const SaveComponent = ({ isReady, isSaved, onPress, isLoading }) => (
    <div className="flex items-center justify-between absolute bottom-0 w-full shadow p-6 py-3 bg-gray-100 bg-opacity-80">
      <p className="text-green-700 text-sm">
        {isSaved ? t("saved") : isLoading ? t("saving") : isReady ? t("saveDesc") : ""}
      </p>
      <button
        onClick={onPress}
        disabled={!isReady || isSaved || isLoading}
        className={`px-6 py-2 rounded hover:opacity-90 transition font-semibold text-sm ${
          !isReady || isLoading || isSaved ? "bg-gray-300 text-white" : "bg-green-700 text-white shadow-lg"
        }`}
      >
        {isLoading ? <div className="animate-ping h-5 w-5 rounded-full bg-white" /> : t("save")}
      </button>
    </div>
  );

  return (
    <div className="relative w-full">
      <div className="p-4 px-6 w-full overflow-y-auto pb-24" style={{ height: "calc(100vh - 11.5rem)" }}>
        <p className="mb-4 text-gray-700">{t("title2")}</p>

        <div className="text-sm text-gray-500 mb-2">{t("type")}</div>
        <input
          placeholder="e.g. Start-up, SME"
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2">{t("ceo")}</div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={ceo}
          onChange={(e) => setCeo(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2 ">
          {t("funding")} <div className="text-xs text-green-700 inline"> {t("fundingSub")}</div>
        </div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={funding}
          type="number"
          onChange={(e) => setFunding(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2 ">
          {t("employees")} <div className="text-xs text-green-700 inline"> {t("employeesSub")}</div>
        </div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={employees}
          type="number"
          onChange={(e) => setEmployees(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2">{t("founding")}</div>
        <input
          className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3 mb-4"
          type="date"
          value={new Date(foundingDate).toISOString().split("T")[0]}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setFoundingDate(new Date(e.target.value).getTime())}
        />
        <div className="text-sm text-gray-500 mb-2 ">
          {t("revenue")} <div className="text-xs text-green-700 inline"> {t("revenueSub")}</div>
        </div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={revenue}
          type="number"
          onChange={(e) => setRevenue(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2">{t("main")}</div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-2">{t("address")}</div>
        <input
          className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveDetails} isLoading={isLoading} />
    </div>
  );
};

export default SkillsetPanel;
