async function jobArrived(s: Switch, flowElement: FlowElement, job: Job) {
    await func(s, flowElement, job, 'test_if', 'test_name', 'if_true', 'if_false', 'true_message','false_message')
}

async function func(s: Switch, flowElement: FlowElement, job: Job, test_if: string, test_name: string, if_true: string, if_false: string, true_message: string, false_message: string){
    var true_message = await flowElement.getPropertyStringValue(true_message) as string
    var test_if = await flowElement.getPropertyStringValue(test_if) as string
    var test_name = await flowElement.getPropertyStringValue(test_name) as string
    var if_true = await flowElement.getPropertyStringValue(if_true) as string
    var if_false = await flowElement.getPropertyStringValue(if_false) as string
    var false_message = await flowElement.getPropertyStringValue(false_message) as string

    if (!(test_if === 'true' || test_if === 'false')){
        job.fail("The test did not return a boolean value")
    }
    else{
        if (test_if === 'true'){
            if (if_true === 'Fail'){
                job.fail(test_name + ' ' + true_message)
            }
            else if (if_true === 'Error'){
                flowElement.log(LogLevel.Error,test_name + ' ' + true_message)
                await job.sendToData(Connection.Level.Error)
            }
            else if (if_true === 'Warning'){
                flowElement.log(LogLevel.Warning,test_name + ' ' + true_message)
                await job.sendToData(Connection.Level.Warning)
            }
            else if (if_true === 'Info'){
                flowElement.log(LogLevel.Info,test_name + ' ' + true_message)
                await job.sendToData(Connection.Level.Success)
            }
            else if (if_true === 'Debug'){
                flowElement.log(LogLevel.Debug,test_name + ' ' + true_message)
                await job.sendToData(Connection.Level.Success)
            }
            else{
                job.fail(test_name + ' ' + 'Failed for some weird reason')
            }
        }
        else if (test_if === 'false'){
            if (if_false === 'Fail'){
                job.fail(test_name + ' ' + false_message)
            }
            else if (if_false === 'Error'){
                flowElement.log(LogLevel.Error,test_name + ' ' + true_message)
                await job.sendToData(Connection.Level.Error)
            }
            else if (if_false === 'Warning'){
                flowElement.log(LogLevel.Warning,test_name + ' ' + false_message)
                await job.sendToData(Connection.Level.Warning)
            }
            else if (if_false === 'Info'){
                flowElement.log(LogLevel.Info,test_name + ' ' + false_message)
                await job.sendToData(Connection.Level.Success)
            }
            else if (if_false === 'Debug'){
                flowElement.log(LogLevel.Debug,test_name + ' ' + false_message)
                await job.sendToData(Connection.Level.Success)
            }
            else{
                job.fail(test_name + ' ' + 'Failed for some weird reason')
            }  
        }
        else{
            job.fail(test_name + ' ' + 'Failed for some weird reason')
        }
    }
}