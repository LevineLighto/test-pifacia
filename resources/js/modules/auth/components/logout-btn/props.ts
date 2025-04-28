import { ComponentPropsWithRef } from "react";

export type LogoutBtnProps = Omit<ComponentPropsWithRef<'button'>, 'children' | 'onClick'>