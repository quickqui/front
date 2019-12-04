import axios from "axios";
import { resolve } from "../Resolve";
import { model } from "../Model/Model";
import createRealtimeSaga from "./createRealtimeSaga";
import {
  DataProvider,
  DataProviderParams,
  chain,
  forResource
} from "@quick-qui/data-provider";
import { env } from "../Env";

let realtimeSagas: any[] = [];

const backEndDataProvider: DataProvider = (
  type: string,
  resource: string,
  params: DataProviderParams
) => {
  const json = { type, resource, params };
  return axios.post(`${env.appServerUrl}/dataProvider`, json).then(r => r.data);
};
const frontEndDataProvider: Promise<DataProvider | undefined> = (async () => {
  const m = (await model) as any;
  const dataSourcesDefinitions =
    m && m.dataSources
      ? m.dataSources.filter((dataSource: any) => dataSource.end === "front")
      : undefined;
  if (dataSourcesDefinitions) {
    const realtimeDatasourceDefs = dataSourcesDefinitions.filter(
      (datasource: any) => !!datasource.realtime
    );
    realtimeSagas = realtimeDatasourceDefs.map((def: any) =>
      createRealtimeSaga(def.resource, def.realtime)
    );
    const dataProviders: Promise<DataProvider>[] = dataSourcesDefinitions.map(
      async (dataSourceD: any) => {
        const dataProvider = await resolve<DataProvider>(
          dataSourceD.dataProvider
        );
        return forResource(dataSourceD.resource, dataProvider);
      }
    );
    return Promise.all(dataProviders).then(dataPS => dataPS.reduce(chain));
  }
  return undefined;
})();

export const dataProvider: Promise<
  [DataProvider, any[]]
> = frontEndDataProvider.then(_ => {
  const provider = _ ? chain(_, backEndDataProvider) : backEndDataProvider;
  return [provider, realtimeSagas.map(s => s(provider))];
});
