
import Change from "./source/change/index";
import Transaction from "./source/transaction/index";

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

  models: DataSet<Model>;
  releases: DataSet<Release>;
  namespaces: DataSet<Namespace>;
  properties: DataSet<Property>;
  types: DataSet<Type>;
  facets: DataSet<Facet>;
  subProperties: DataSet<SubProperty>;
  localTerms: DataSet<LocalTerm>;

  log: Transaction[];

  static DataSet: DataSet<T>;

}

interface DataSet<T> {

  /**
   * @param input A new item to add
   */
  add(input: T, change: Change): Promise<T>;

  edit(input: T, change: Change): Promise<T>;

  delete(input: T, change: Change): Promise<T>;

  get(id: string): Promise<T>;

  find(criteria: object): Promise<T[]>;

  count(criteria: object): Promise<number>;

  /**
   * Object history for changes in the current release
   */
  revisions(object: T): Promise<Transaction[]>;

  /**
   * Published object history across releases
   */
  history(object: T): Promise<Transaction[]>;

}
