import * as gs from "gs-json";
import * as three from "three";
import * as cs from "./_three_utils_dev";

//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and two points describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param pt_x Point that lies on x-axis of plane
 * @param pt_y Point that lies on y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _FromOriginPoints(origin: gs.IPoint, pt_x: gs.IPoint, pt_y: gs.IPoint ):
                                gs.IPlane {
    const m1: gs.IModel = origin.getModel();
    const m2: gs.IModel = pt_x.getModel();
    const m3: gs.IModel = pt_y.getModel();
    if(m1 !== m2) { throw new Error("Points need to be on the same model");}
    if(m1 !== m3) { throw new Error("Points need to be on the same model");}
    const vec_x: three.Vector3 = cs.vectorFromPointsAtoB(origin, pt_x);
    const vec_y: three.Vector3 = cs.vectorFromPointsAtoB(origin, pt_y);
    return m1.getGeom().addPlane(origin, [vec_x.x,vec_x.y,vec_x.z], [vec_y.x,vec_y.y,vec_y.z]);
}
/**
 * Creates an orthogonal projected point on a plane
 * @param plane on which the orthogonal projection occurs
 * @param point to project
 * @returns New point if successful, null if unsuccessful or an error
 */
export function _PointOrthoProjectPlane(point: gs.IPoint, plane: gs.IPlane): gs.IPoint {
    const m1: gs.IModel = point.getModel();
    const m2: gs.IModel = plane.getModel();
    if(m1 !== m2) { throw new Error("Parameters need to be on the same model");}
    throw new Error("method not implemented");
}

// - WEEK 3 -
/**
 * Creates a plane from an origin point and the World x and y axis
 *
 * Creates a plane parallel to the World XY plane
 * @param origin 3D point to use as origin of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _FromOriginWCS(origin: gs.IPoint): gs.IPlane {
    return origin.getModel().getGeom().addPlane(origin, [1,0,0],[0,1,0]);
}

//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and normal direction vector
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneFromNormal
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param normal 3D vector to define normal direction of plane
 * @param xaxis Vector to use define x-axis of plane (optional)
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _AddPlane(m: gs.IModel, origin: gs.IPoint, normal: [number, number, number]): gs.IPlane {
     const e3: three.Vector3 = new three.Vector3(...normal).normalize();
     const e1: three.Vector3 = new three.Vector3(-e3.y,e3.x,0).normalize();
     const e2: three.Vector3 = e3.cross(e1);
     return m.getGeom().addPlane(origin, e1.toArray() as gs.XYZ, e2.toArray() as gs.XYZ);
 }

/**
 * Returns intersections between an infinite plane and a curve/polyline object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneCurveIntersection
 * @param m Model
 * @param plane Plane to intersect
 * @param polyline Polyline to intersect
 * @returns List of intersection information if successful, null if unsuccessful or on error.
 * [0] = type of intersection. 1 = point, 2 = overlap
 * [1] = intersection point if [0] = 1, list of intersection start point and end point if [0] = 2
 */
export function _PlanePolylineIntersection(m: gs.IModel, plane: gs.IPlane, polyline: gs.IPolyline): void {
    throw new Error("Method not implemented");
}
