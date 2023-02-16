import { Command, OptionValues } from '@commander-js/extra-typings'

/**
 * @deprecated たぶんいらない
 */
export type ActionFn<
  Args extends any[] = [],
  Opts extends OptionValues = {},
> = Parameters<Command<Args, Opts>['action']>[number]
