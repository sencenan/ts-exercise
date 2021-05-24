namespace LeastStops {

type Stop = [number, number];

interface Trip {
    target: number;
    pos: number;
    fuel: number;
    numberStops: number;
};

const
    takeStop = (trip: Trip, stop: Stop): Trip => ({
        target: trip.target,
        // allow reachable stops to be added out of order
        pos: Math.max(trip.pos, stop[0]),
        fuel: trip.pos < stop[0]
            ? trip.fuel + stop[1] - (stop[0] - trip.pos)
            : trip.fuel + stop[1], // if already passed or at stop, no additional fuel cost
        numberStops: trip.numberStops + 1
    }),
    hasReachedTarget = (trip: Trip): boolean => trip.pos + trip.fuel >= trip.target;

const planTrip = (trip: Trip, stops: Stop[]): number => {
    let skipped: Stop[] = [];

    for (let i = 0; i < stops.length;) {
        const stop = stops[i];

        if (trip.pos + trip.fuel >= stop[0]) {
            if (hasReachedTarget(takeStop(trip, stop))) {
                return trip.numberStops + 1;
            } else {
                skipped.push(stop);
                i += 1;
            }
        } else {
            skipped.sort((a, b) => a[1] - b[1]); // in-place sort asc on skipped by fuel available

            while (skipped.length && trip.pos + trip.fuel < stop[0]) {
                // all stops in skipped are reachable, order of position of the stops doesn't matter
                trip = takeStop(trip, (skipped.pop() as Stop));

                if (hasReachedTarget(trip)) {
                    return trip.numberStops;
                }
            }

            if (trip.pos + trip.fuel < stop[0]) {
                // still cannot reach at least next stop, no valid plan
                return -1;
            } else {
                // reset skipped, but do not advance i, reconsider current stop (it might not be needed)
                skipped = [];
            }
        }
    }

    return -1;
};

let
    iota = 0,
    trip: Trip = {
        pos: 0,
        fuel: 10,
        target: 100,
        numberStops: 0
    };

console.log(iota++, planTrip(trip, []));
console.log(iota++, planTrip(trip, [[10, 89]]));
console.log(iota++, planTrip(trip, [[10, 90]]));
console.log(iota++, planTrip(trip, [[10, 50], [11, 100], [50, 49]]));
console.log(iota++, planTrip(trip, [[10, 50], [9, 90], [50, 10], [60, 30]]));
console.log(iota++, planTrip(trip, [[10, 50], [9, 89], [50, 10], [60, 30]]));
console.log(iota++, planTrip(trip, [[10, 60], [20, 30], [30, 30], [60, 40]]));
console.log(iota++, planTrip(trip, [[10, 60], [20, 30], [30, 30], [60, 40]]));
console.log(iota++, planTrip(trip, [[10, 60], [20, 10], [30, 10], [80, 40]]));
console.log(iota++, planTrip(trip, [[10, 60], [20, 5], [30, 5], [80, 40]]));
console.log(iota++, planTrip(trip, [[10, 60], [20, 5], [30, 5], [81, 40]]));

}
