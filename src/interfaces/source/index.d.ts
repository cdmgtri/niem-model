
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
import NIEMObject from "../../niem-object/index";

export = NIEMModelSource;

declare class NIEMModelSource {

  models: DataSet<Model, Model.IdentifiersType, Model.CriteriaType>;

  releases: DataSet<Release, Release.IdentifiersType, Release.CriteriaType>;

  namespaces: DataSet<Namespace, Namespace.IdentifiersType, Namespace.CriteriaType>;

  properties: DataSet<Property, Property.IdentifiersType, Property.CriteriaType>;

  types: DataSet<Type, Type.IdentifiersType, Type.CriteriaType>;

  facets: DataSet<Facet, Facet.IdentifiersType, Facet.CriteriaType>;

  subProperties: DataSet<SubProperty, SubProperty.IdentifiersType, SubProperty.CriteriaType>;

  localTerms: DataSet<LocalTerm, LocalTerm.IdentifiersType, LocalTerm.CriteriaType>;

  log: Transaction[];

  static DataSet: DataSet<T>;

}

interface DataSet<T, U, V> {

  /**
   * @param input A new item to add
   */
  add(input: T, change: Change): Promise<T>;

  edit(input: T, change: Change): Promise<T>;

  delete(input: T, change: Change): Promise<T>;

  get(id: U): Promise<T>;

  find(criteria: V): Promise<T[]>;

  count(criteria: V): Promise<number>;

  /**
   * Object history for changes in the current release
   */
  revisions(object: T): Promise<Transaction[]>;

  /**
   * Published object history across releases
   */
  history(object: T): Promise<Transaction[]>;

}
