const { Worker } = require('bullmq');
const {emailQueue} = require('../queues/emailQueue');
const IORedis = require('ioredis');
const sendEmail = require('../services/emailServices');

const connection = new IORedis({
    maxRetriesPerRequest: null
});


new Worker("emailQueue", async (job)=>{
    console.log("its job a");
    console.log(emailQueue);
    console.log("its job");
    // console.log(job.data);
    console.log(job);
    // console.log("job data is is is ");
    ;
    
    
    const { to, subject, text } = job.data;
    console.log(to, subject, text);
    // console.log("data for added is ");
     console.log("data for added again ");
    
    
    console.log(`Sending Email to`);

    await sendEmail(to,subject, text);
    console.log(`Email sent to ${to}`);
    },
    {connection}
)