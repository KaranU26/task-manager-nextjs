import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@/app/lib/auth'

export async function GET() {
  const session = await auth()
  
    if (!session?.user?.id) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }
  
  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id
    }
  })
  
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
    try {
        // 1. Get the session
        const session = await auth()
        
        // 2. If no user is logged in, return error
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
        }
        
        const body = await request.json()
        
        // 3. Create task connected to the user
        const newTask = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                completed: false,
                userId: session.user.id  // ← Connect to user!
            }
        })
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ message: 'Error creating task' }, { status: 500 });
    }
}