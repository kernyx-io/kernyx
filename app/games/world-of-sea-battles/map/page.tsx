"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import "./map.css";

type Marker = {
  id: string;
  name: string;
  x: number; // percent from left
  y: number; // percent from top
};

type MapLayer = {
  id: string;
  name: string;
  icon: string;
  markers: Marker[];
};

type Viewport = {
  scale: number;
  x: number;
  y: number;
};

const MAP_LAYERS: MapLayer[] = [
  {
    id: "cities",
    name: "Cities",
    icon: "🪙",
    markers: [
      { id: "city-assab", name: "Assab", x: 5.58, y: 78.26 },
      { id: "city-sharhat", name: "Sharhat", x: 15.96, y: 72.09 },
      { id: "city-al-khalif", name: "Al-Khalif", x: 6.41, y: 90.87 },
    ],
  },
];

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.2;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function WosbMapPage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    cities: true,
  });

  const [viewport, setViewport] = useState<Viewport>({
    scale: 1,
    x: 0,
    y: 0,
  });

  const visibleLayerCount = useMemo(
    () => MAP_LAYERS.filter((layer) => activeLayers[layer.id]).length,
    [activeLayers]
  );

  const visibleMarkerCount = useMemo(
    () =>
      MAP_LAYERS.reduce((count, layer) => {
        if (!activeLayers[layer.id]) return count;
        return count + layer.markers.length;
      }, 0),
    [activeLayers]
  );

  function toggleLayer(layerId: string) {
    setActiveLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  }

  function showAllLayers() {
    setActiveLayers(
      Object.fromEntries(MAP_LAYERS.map((layer) => [layer.id, true]))
    );
  }

  function hideAllLayers() {
    setActiveLayers(
      Object.fromEntries(MAP_LAYERS.map((layer) => [layer.id, false]))
    );
  }

  function setZoomAroundPoint(nextScale: number, clientX?: number, clientY?: number) {
    const boundedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

    if (!stageRef.current || clientX == null || clientY == null) {
      setViewport((prev) => ({ ...prev, scale: boundedScale }));
      return;
    }

    const rect = stageRef.current.getBoundingClientRect();
    const pointX = clientX - rect.left;
    const pointY = clientY - rect.top;

    setViewport((prev) => {
      const worldX = (pointX - prev.x) / prev.scale;
      const worldY = (pointY - prev.y) / prev.scale;

      const nextX = pointX - worldX * boundedScale;
      const nextY = pointY - worldY * boundedScale;

      return {
        scale: boundedScale,
        x: nextX,
        y: nextY,
      };
    });
  }

  function zoomIn() {
    if (!stageRef.current) {
      setViewport((prev) => ({
        ...prev,
        scale: clamp(prev.scale + ZOOM_STEP, MIN_SCALE, MAX_SCALE),
      }));
      return;
    }

    const rect = stageRef.current.getBoundingClientRect();
    setZoomAroundPoint(
      viewport.scale + ZOOM_STEP,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  }

  function zoomOut() {
    if (!stageRef.current) {
      setViewport((prev) => ({
        ...prev,
        scale: clamp(prev.scale - ZOOM_STEP, MIN_SCALE, MAX_SCALE),
      }));
      return;
    }

    const rect = stageRef.current.getBoundingClientRect();
    setZoomAroundPoint(
      viewport.scale - ZOOM_STEP,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  }

  function resetView() {
    setViewport({
      scale: 1,
      x: 0,
      y: 0,
    });
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();

    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoomAroundPoint(viewport.scale + delta, e.clientX, e.clientY);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;

    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: viewport.x,
      originY: viewport.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.dragging) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    setViewport((prev) => ({
      ...prev,
      x: dragState.current.originX + dx,
      y: dragState.current.originY + dy,
    }));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragState.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <div className="wosb-map-page">
      <header className="wosb-map-header">
        <div className="wosb-map-eyebrow">⚓ World of Sea Battle</div>
        <h1 className="wosb-map-title">Interactive Map</h1>
        <p className="wosb-map-subtitle">
          Toggle map layers, zoom in, and drag the chart to explore.
        </p>
      </header>

      <div className="wosb-map-layout">
        <section className="wosb-map-stage-card">
          <div className="wosb-map-stage-head">
            <div>
              <div className="wosb-map-section-label">Sea Chart</div>
              <div className="wosb-map-section-sub">
                {visibleLayerCount} active layer · {visibleMarkerCount} visible marker
                {visibleMarkerCount === 1 ? "" : "s"}
              </div>
            </div>

            <div className="wosb-map-actions">
              <button type="button" className="wosb-map-action-btn" onClick={showAllLayers}>
                Show All
              </button>
              <button type="button" className="wosb-map-action-btn" onClick={hideAllLayers}>
                Hide All
              </button>
              <button type="button" className="wosb-map-action-btn" onClick={zoomOut}>
                −
              </button>
              <button type="button" className="wosb-map-action-btn" onClick={resetView}>
                {Math.round(viewport.scale * 100)}%
              </button>
              <button type="button" className="wosb-map-action-btn" onClick={zoomIn}>
                +
              </button>
            </div>
          </div>

          <div
            ref={stageRef}
            className={`wosb-map-stage ${
              dragState.current.dragging ? "wosb-map-stage-dragging" : ""
            }`}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className="wosb-map-canvas"
              style={{
                transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
              }}
            >
              <div className="wosb-map-artboard">
                <Image
                  src="/images/wosb-map.png"
                  alt="World of Sea Battle map"
                  fill
                  priority
                  className="wosb-map-image"
                  sizes="(max-width: 1100px) 100vw, 70vw"
                />

             <div className="wosb-map-marker-overlay">
  {MAP_LAYERS.map((layer) =>
    activeLayers[layer.id]
      ? layer.markers.map((marker) => {
          const markerSize = Math.max(28, Math.min(56, 32 * viewport.scale));
          const scaledLeft = marker.x;
          const scaledTop = marker.y;

          return (
            <div
              key={marker.id}
              className="wosb-map-labeled-marker"
              style={{
                left: `${scaledLeft}%`,
                top: `${scaledTop}%`,
                transform: `translate(-50%, -50%) translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
                transformOrigin: "center center",
              }}
            >
              <button
                type="button"
                className="wosb-map-marker"
                title={marker.name}
                style={{
                  width: `${markerSize}px`,
                  height: `${markerSize}px`,
                }}
              >
                <img
                  src="/map-icons/city.png"
                  alt={marker.name}
                  className="wosb-map-marker-image"
                />
              </button>

              <span
                className="wosb-map-marker-label"
                style={{
                  fontSize: `${Math.max(11, Math.min(18, 12 * viewport.scale))}px`,
                }}
              >
                {marker.name}
              </span>
            </div>
          );
        })
      : null
  )}
</div>
              </div>
            </div>
          </div>
        </section>

        <aside className="wosb-map-sidebar">
          <section className="wosb-map-panel">
            <div className="wosb-map-panel-title">Layers</div>

            <div className="wosb-map-layer-list">
              {MAP_LAYERS.map((layer) => {
                const isOn = !!activeLayers[layer.id];

                return (
                  <button
                    key={layer.id}
                    type="button"
                    className={`wosb-map-layer-row ${
                      isOn ? "wosb-map-layer-row-active" : ""
                    }`}
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <span className="wosb-map-layer-icon">{layer.icon}</span>

                    <span className="wosb-map-layer-meta">
                      <span className="wosb-map-layer-name">{layer.name}</span>
                      <span className="wosb-map-layer-count">
                        {layer.markers.length} marker
                        {layer.markers.length === 1 ? "" : "s"}
                      </span>
                    </span>

                    <span
                      className={`wosb-map-toggle ${isOn ? "wosb-map-toggle-on" : ""}`}
                    >
                      {isOn ? "ON" : "OFF"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="wosb-map-panel">
            <div className="wosb-map-panel-title">How to Use</div>
            <div className="wosb-map-help">
              <p>• Drag the map to pan.</p>
              <p>• Use your mouse wheel to zoom.</p>
              <p>• Use the layer toggle to show or hide cities.</p>
              <p>• More categories can be added later without changing the map system.</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
