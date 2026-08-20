'use client';

import * as Primitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Root = Primitive.Root;
const Group = Primitive.Group;
const Value = Primitive.Value;

const Trigger = forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <Primitive.Trigger
    ref={ref}
    className={twMerge(
      'flex h-10 w-full items-center min-w-48 justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <Primitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Primitive.Icon>
  </Primitive.Trigger>
));
Trigger.displayName = Primitive.Trigger.displayName;

const ScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof Primitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof Primitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <Primitive.ScrollUpButton
    ref={ref}
    className={twMerge('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </Primitive.ScrollUpButton>
));
ScrollUpButton.displayName = Primitive.ScrollUpButton.displayName;

const ScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof Primitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof Primitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <Primitive.ScrollDownButton
    ref={ref}
    className={twMerge('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </Primitive.ScrollDownButton>
));
ScrollDownButton.displayName = Primitive.ScrollDownButton.displayName;

const Content = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Primitive.Portal>
    <Primitive.Content
      ref={ref}
      className={twMerge(
        'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <ScrollUpButton />
      <Primitive.Viewport
        className={twMerge(
          'p-1',
          position === 'popper' && 'h-(--radix--trigger-height) w-full min-w-(--radix-select-trigger-width)'
        )}
      >
        {children}
      </Primitive.Viewport>
      <ScrollDownButton />
    </Primitive.Content>
  </Primitive.Portal>
));
Content.displayName = Primitive.Content.displayName;

const Label = React.forwardRef<
  React.ComponentRef<typeof Primitive.Label>,
  React.ComponentPropsWithoutRef<typeof Primitive.Label>
>(({ className, ...props }, ref) => (
  <Primitive.Label
    ref={ref}
    className={twMerge('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
Label.displayName = Primitive.Label.displayName;

const Item = React.forwardRef<
  React.ComponentRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item>
>(({ className, children, ...props }, ref) => (
  <Primitive.Item
    ref={ref}
    className={twMerge(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-950 data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Primitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </Primitive.ItemIndicator>
    </span>
    <Primitive.ItemText>{children}</Primitive.ItemText>
  </Primitive.Item>
));
Item.displayName = Primitive.Item.displayName;

const Separator = React.forwardRef<
  React.ComponentRef<typeof Primitive.Separator>,
  React.ComponentPropsWithoutRef<typeof Primitive.Separator>
>(({ className, ...props }, ref) => (
  <Primitive.Separator
    ref={ref}
    className={twMerge('-mx-1 my-1 h-px bg-gray-100', className)}
    {...props}
  />
));
Separator.displayName = Primitive.Separator.displayName;

export const Select = {
  Root,
  Content,
  Group,
  Item,
  Label,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
};
