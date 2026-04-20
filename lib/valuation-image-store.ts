"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

let files: File[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function setValuationImages(nextFiles: File[]) {
  files = nextFiles;
  emit();
}

export function getValuationImages() {
  return files;
}

export function clearValuationImages() {
  files = [];
  emit();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useValuationImages() {
  return useSyncExternalStore(subscribe, getValuationImages, getValuationImages);
}