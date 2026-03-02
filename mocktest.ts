import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
type Student = {
    id: number;
    name: string;
    year?: number;
    major?: string;
};