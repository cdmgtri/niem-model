
import Change from "./change/index";
import Transaction from "./transaction/index";

import Model from "../../model/index";
import Release from "../../release/index";
import Namespace from "../../namespace/index";
import Property from "../../property/index";
import Type from "../../type/index"
import Facet from "../../facet/index";
import SubProperty from "../../subproperty/index";
import LocalTerm from "../../local-term/index";


export = NIEMModelSource;

declare class NIEMModelSource {

  models: SourceDataSetInterface<Model>;
  releases: SourceDataSetInterface<Release>;
  namespaces: SourceDataSetInterface<Namespace>;
  properties: SourceDataSetInterface<Property>;
  types: SourceDataSetInterface<Type>;
  facets: SourceDataSetInterface<Facet>;
  subProperties: SourceDataSetInterface<SubProperty>;
  localTerms: SourceDataSetInterface<LocalTerm>;

  log: Transaction[];

  static SourceDataSet: SourceDataSetInterface<T>;

}

interface SourceDataSetInterface<T> {

  /**
   * @param input A new item to add
   */
  add(input: T, change: Change): Promise<T>;

  edit(input: T, change: Change): Promise<T>;

  delete(input: T, change: Change): Promise<T>;

  get(id: string): Promise<T>;

  find(criteria: object): Promise<T[]>;

  count(criteria: object): Promise<number>;

  history(id: string): Promise<Transaction[]>;

}
