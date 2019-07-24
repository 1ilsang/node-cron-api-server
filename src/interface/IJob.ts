export interface IJob {
    seq: number,
    craeted: Date,
    runtime: Date,
    type: string,
    loop: boolean
}

export interface IJobForm {
    craeted: Date,
    runtime: Date,
    type: string,
    isloop: boolean
}

export interface IJobUpdateForm {
    seq: number,
    runtime: Date,
    type: string,
    isloop: boolean
}
