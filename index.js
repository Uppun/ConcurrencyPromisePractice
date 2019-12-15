const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function MainTask(number, SidePromises) {
    console.log('wot')
    if (number === 0) {
        return;
    }

    return wait(10 * 1000).then(() => {
        for (let i = number; i > 0; i--) {
            SidePromises.push(SideTask(i*2*10000));
        }

        return MainTask(number-1, SidePromises);
    });


}

function SideTask(time) {
    return wait(time).then(() => console.log(`side task done in ${time} ms.`));
}

async function runTheThing() {
    const MainPromises = new Map();
    const BPromises = [];

    await MainTask(5, BPromises);
    await Promise.all(BPromises);
    console.log('done')
}

runTheThing();




/*
A finishes -> start B and A' at the same time
- A needs to pass data to both A' and B
- you still need to track completion of all B's (there should be one for every A)
i'm
not sure where the issue comes from then because
you literally plug in "fetch messages for [id]" as the "A" and "save the results" as the "B"
*/